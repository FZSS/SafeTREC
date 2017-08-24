import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Slider,
  SegmentedControlIOS,
} from 'react-native';
import _ from 'underscore';
import PropTypes from 'prop-types';
import styles from './styles';
import { submitConcern } from '../../actions/concerns';
import { getConcernsInRegion } from '../../actions/map';
import { concernsPropTypes } from '../../reducers/concernsReducer';
import { imagesPropTypes } from '../../reducers/imagesReducer';
import { mapPropTypes } from '../../reducers/mapReducer';
import SpinnerOverlay from '../SpinnerOverlay/SpinnerOverlay';
import modes from '../../constants/modesOfTransportation';

// const severity = ['Tip', 'Alert', 'Warning', 'Dangerous', 'Critical'];

const mapStateToProps = state => ({
  submissionStatus: state.concerns.newConcernSubmissionStatus,
  newConcern: state.concerns.newConcern,
  newImages: state.images.newConcernImages,
  mapRegion: state.map.mapRegion,
  predictions: state.images.newConcernImagePredictions,
  predictionStatus: state.images.imagePredictionStatus,
  imagePredictionEnabled: state.images.imagePredictionEnabled,
  concernTypes: state.concerns.concernTypes,
});

const mapDispatchToProps = {
  submitConcern,
  getConcernsInRegion,
};

class CommentCard extends Component {
  static propTypes = {
    /* store states */
    submissionStatus: concernsPropTypes.newConcernSubmissionStatus.isRequired,
    newConcern: concernsPropTypes.concern.isRequired,
    newImages: PropTypes.arrayOf(imagesPropTypes.image).isRequired,
    mapRegion: mapPropTypes.mapRegion.isRequired,
    predictions: PropTypes.arrayOf(imagesPropTypes.prediction).isRequired,
    predictionStatus: imagesPropTypes.imagePredictionStatus.isRequired,
    imagePredictionEnabled: PropTypes.bool.isRequired,
    concernTypes: concernsPropTypes.concernTypes.isRequired,
    /* actions */
    submitConcern: PropTypes.func.isRequired,
    getConcernsInRegion: PropTypes.func.isRequired,
    /* own props */
    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    concernType: PropTypes.string.isRequired,
    modeOfTransportation: PropTypes.string, // TODO: store this in store
  };

  static defaultProps = {
    modeOfTransportation: 'Pedestrian',
  };

  static navigatorButtons = {
    rightButtons: [{
      title: 'Submit',
      id: 'submit',
      buttonFontWeight: '900',
    }],
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  state = {
    concernDescription: '',
    rating: 1,
  };

  componentWillMount() {
    this.props.navigator.setTitle({ title: `${this.props.concernType} Concern` });
  }

  componentDidUpdate(prevProps) {
    const popToRoot = () => {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'fade',
      });
    };

    if (prevProps.submissionStatus.pending) {
      if (this.props.submissionStatus.failed) {
        Alert.alert(
          'Failed Submission',
          'Sorry about that', // TODO: should show error msg
          [
            { text: 'OK', onPress: () => popToRoot() },
          ],
        );
      } else if (this.props.submissionStatus.success) {
        this.props.getConcernsInRegion(this.props.mapRegion);
        Alert.alert(
          'Successful Submission',
          'Thank you',
          [
            { text: 'OK', onPress: () => popToRoot() },
          ],
        );
      }
    }
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'submit') {
        this.props.navigator.setStyle({
          navBarHidden: true,
        });

        const details = {
          address: this.props.newConcern.address,
          coordinate: this.props.newConcern.coordinate,
          title: `${this.props.concernType} concern`,
          description: this.state.concernDescription,
        };

        this.props.submitConcern(details, this.props.newImages);
      }
    }
  }

  getPredictions() {
    if (this.props.newImages.length === 0) {
      return (
        <Text style={styles.predictionAlertText}>
          No Image
        </Text>
      );
    } else if (!this.props.imagePredictionEnabled) {
      return (
        <Text style={styles.predictionAlertText}>
          Image Prediction Disabled
        </Text>
      );
    } else if (this.props.predictionStatus.pending) {
      return (
        <ActivityIndicator
          animating={this.props.predictionStatus.pending}
          color="darkorange"
        />
      );
    } else if (this.props.predictionStatus.failed) {
      return (
        <Text style={styles.predictionAlertText}>
          Failed to Get Prediction
        </Text>
      );
    }
    return (
      this.props.predictions.map((prediction, index) => (
        <TouchableOpacity
          /* eslint react/no-array-index-key: 1 */
          key={index}
          style={styles.predictionTag}
          onPress={() => {
            this.appendConcernDescription(prediction.description);
          }}
        >
          <Text style={styles.predictionTagText}>
            {prediction.description}
          </Text>
        </TouchableOpacity>
      ))
    );
  }

  appendConcernDescription(text) {
    const concernDescription = _.clone(this.state.concernDescription).concat(text);
    this.setState({ concernDescription });
  }

  getConcernTypes() {
    const types = _.clone(this.props.concernTypes);
    types.push('Other');
    return types;
  }

  updateRating(value) {
    const rating = Math.round(value);
    this.setState({ rating });
  }

  render() {
    return (
      <View style={styles.container}>

        <SpinnerOverlay visible={(this.props.submissionStatus.pending)} />

        <View style={styles.card}>

          <SegmentedControlIOS
            style={styles.segmentedControl}
            tintColor="darkorange"
            values={modes}
            selectedIndex={modes.indexOf(this.props.modeOfTransportation)}
            // onValueChange={(value) => {
            //   this.setState({ reportCategory: value });
            // }}
          />

          {/* <SegmentedControlIOS */}
          {/* style={styles.segmentedControl} */}
          {/* tintColor="darkorange" */}
          {/* values={this.getConcernTypes()} */}
          {/* enabled={false} */}
          {/* selectedIndex={this.getConcernTypes().indexOf(this.props.concernType)} */}
          {/* // onValueChange={(value) => { */}
          {/* //   this.setState({ reportCategory: value }); */}
          {/* // }} */}
          {/* /> */}

          <View style={styles.ratingBox}>
            <Text style={styles.ratingTextLong}> Concern Rating </Text>
            <Slider
              style={{ flex: 5 }}
              onValueChange={v => this.updateRating(v)}
              minimumTrackTintColor="darkorange"
              minimumValue={1}
              maximumValue={100}
            />
            <Text style={styles.ratingText}> {this.state.rating} </Text>
          </View>

          <ScrollView style={styles.predictionBox} horizontal >
            {this.getPredictions()}
          </ScrollView>

          <TextInput
            style={styles.commentBox}
            placeholder={'What are you concerned about at this location?'}
            multiline
            editable
            placeholderTextColor={'orange'}
            onChangeText={concernDescription => this.setState({ concernDescription })}
            value={this.state.concernDescription}
          />
        </View>


      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentCard);

