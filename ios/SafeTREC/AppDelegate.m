/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import "RCCManager.h"
#import <React/RCTRootView.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>

@import GoogleMaps;
@import GooglePlaces;

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  // **********************************************
  // ***  Google Maps and Places API setup    *****
  // **********************************************

  [GMSServices provideAPIKey:@"AIzaSyDEIGLunOoC8C-L65MTCrXqLtHti99eBik"];
  [GMSPlacesClient provideAPIKey:@"AIzaSyDEIGLunOoC8C-L65MTCrXqLtHti99eBik"];

  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  // **********************************************
  // ***  Native Navigation from wix BOOTSTRAP ****
  // **********************************************
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.backgroundColor = [UIColor whiteColor];
  [[RCCManager sharedInstance] initBridgeWithBundleURL:jsCodeLocation];
  
  // **********************************************
  // ***  Facebook Login SDK                    ***
  // **********************************************
  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];;
  
//  [[FBSDKApplicationDelegate sharedInstance] application:application
//                           didFinishLaunchingWithOptions:launchOptions];
//

  
  //old React Native bootstrap, using React Native Navigation from wix
  //  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
  //                                                      moduleName:@"SafeTREC"
  //                                               initialProperties:nil
  //                                                   launchOptions:launchOptions];
  //  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  //
  //  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  //  UIViewController *rootViewController = [UIViewController new];
  //  rootViewController.view = rootView;
  //  self.window.rootViewController = rootViewController;
  //  [self.window makeKeyAndVisible];
  return YES;
  
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  [FBSDKAppEvents activateApp];
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
  return [[FBSDKApplicationDelegate sharedInstance] application:application
                                                        openURL:url
                                              sourceApplication:sourceApplication
                                                     annotation:annotation];
}



@end
