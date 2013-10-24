/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 * WARNING: This is generated code. Do not modify. Your changes *will* be lost.
 */

#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"

@implementation ApplicationDefaults

+ (NSMutableDictionary*) copyDefaults
{
	NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];
	
	[_property setObject:[TiUtils stringValue:@"vPqeJv3b05tU807CaaslqR2UKooQieO4"] forKey:@"acs-oauth-secret-production"];
	[_property setObject:[TiUtils stringValue:@"4YYa2c0TLgWC9A8j8Qt9l81Ff3InhDEi"] forKey:@"acs-oauth-key-production"];
	[_property setObject:[TiUtils stringValue:@"e3gscD7y21GZki5Jh4RHLIyrk4PP5koz"] forKey:@"acs-api-key-production"];
	[_property setObject:[TiUtils stringValue:@"VGUosIXjFpKfWQ2mi8x00chOxVyw2KJu"] forKey:@"acs-oauth-secret-development"];
	[_property setObject:[TiUtils stringValue:@"1LIQsOtTmJiP7OaG3zCqe8F79Uh6bHFC"] forKey:@"acs-oauth-key-development"];
	[_property setObject:[TiUtils stringValue:@"tGKQ62mVRFS3AvCxelxnoHjJI8vIBtbW"] forKey:@"acs-api-key-development"];
	[_property setObject:[NSNumber numberWithInt:[TiUtils intValue:@"32768"]] forKey:@"ti.android.threadstacksize"];
	[_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];
	[_property setObject:[NSNumber numberWithBool:[TiUtils boolValue:@"true"]] forKey:@"ti.android.fastdev"];
	return _property;
}

+ (NSDictionary*) launchUrl {
    static BOOL launched = NO;
    if (!launched) {
        launched = YES;
        return nil;
    } else { return nil;}
}
 
@end