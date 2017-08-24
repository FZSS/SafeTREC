import _ from 'underscore';
import concernsReducer, { initialState } from '../concernsReducer';
import actionTypes from '../../constants/actionTypes';

describe('concerns reducer', () => {
  /* eslint prefer-template: 0 */
  it('should return the initial state', () => {
    expect(concernsReducer(undefined, {})).toEqual(
      initialState,
    );
  });

  it('updates new concern submission status to pending when pending', () => {
    const state = concernsReducer(undefined, {
      type: actionTypes.SubmitConcern + '_PENDING',
    });
    expect(state.newConcernSubmissionStatus.pending).toBe(true);
    expect(state.newConcernSubmissionStatus.success).toBe(false);
    expect(state.newConcernSubmissionStatus.failed).toBe(false);
  });

  it('updates new concern submission status to successful when fulfilled', () => {
    const state = concernsReducer(undefined, {
      type: actionTypes.SubmitConcern + '_FULFILLED',
    });
    expect(state.newConcernSubmissionStatus.pending).toBe(false);
    expect(state.newConcernSubmissionStatus.success).toBe(true);
    expect(state.newConcernSubmissionStatus.failed).toBe(false);
  });

  it('updates new concern submission status to failed when rejected', () => {
    const state = concernsReducer(undefined, {
      type: actionTypes.SubmitConcern + '_REJECTED',
    });
    expect(state.newConcernSubmissionStatus.pending).toBe(false);
    expect(state.newConcernSubmissionStatus.success).toBe(false);
    expect(state.newConcernSubmissionStatus.failed).toBe(true);
  });

  it('updates concern delete status to pending when pending', () => {
    const state = concernsReducer(undefined, {
      type: actionTypes.DeleteConcern + '_PENDING',
    });
    expect(state.concernDeleteStatus.pending).toBe(true);
    expect(state.concernDeleteStatus.success).toBe(false);
    expect(state.concernDeleteStatus.failed).toBe(false);
  });

  it('updates concern delete status to successful when fulfilled', () => {
    const state = concernsReducer(undefined, {
      type: actionTypes.DeleteConcern + '_FULFILLED',
    });
    expect(state.concernDeleteStatus.pending).toBe(false);
    expect(state.concernDeleteStatus.success).toBe(true);
    expect(state.concernDeleteStatus.failed).toBe(false);
  });

  it('updates concern delete status to failed when rejected', () => {
    const state = concernsReducer(undefined, {
      type: actionTypes.DeleteConcern + '_REJECTED',
    });
    expect(state.concernDeleteStatus.pending).toBe(false);
    expect(state.concernDeleteStatus.success).toBe(false);
    expect(state.concernDeleteStatus.failed).toBe(true);
  });

  describe('it updates new concern address correctly', () => {
    const state = _.clone(initialState);
    const payload = {
      data: {
        results: [
          { formatted_address: 'Correct Address 1' },
          { formatted_address: 'Another Address 2' },
        ],
      },
    };

    beforeEach(() => {
      state.newConcern.address = '2715 Dwight Way';
    });

    it('updates the new concern address directly', () => {
      const newState = concernsReducer(state, {
        type: actionTypes.UpdateNewConcernAddress,
        payload: '2725 Channing Way',
      });
      expect(newState.newConcern.address).toEqual('2725 Channing Way');
    });

    it('sets address to No Address Found if has ZERO_RESULTS', () => {
      const zero = {
        data: {
          ...payload.data,
          status: 'ZERO_RESULTS',
        },
      };

      const newState = concernsReducer(state, {
        type: actionTypes.UpdateNewConcernAddressFromGeocode + '_FULFILLED',
        payload: zero,
      });
      expect(newState.newConcern.address).toEqual('No Address Found');
    });

    it('sets address to first in results found from geocode payload', () => {
      const newState = concernsReducer(state, {
        type: actionTypes.UpdateNewConcernAddressFromGeocode + '_FULFILLED',
        payload,
      });
      expect(newState.newConcern.address).toEqual('Correct Address 1');
    });
  });

  it('updates new concern coordinate', () => {
    const state = _.clone(initialState);
    const newLatLong = {
      latitude: 123.123,
      longitude: 13.123,
    };
    const newState = concernsReducer(state, {
      type: actionTypes.UpdateNewConcernCoordinates,
      payload: newLatLong,
    });

    expect(newState.newConcern.coordinate).toEqual(newLatLong);
  });

  it('updates the concern type correctly', () => {
    const types = ['A', 'B', 'C'];
    const state = concernsReducer(undefined, {
      type: actionTypes.UpdateConcernTypes,
      types,
    });
    expect(state.concernTypes).toEqual(types);
  });
});

