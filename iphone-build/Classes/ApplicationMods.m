#import "ApplicationMods.h"

@implementation ApplicationMods

+ (NSArray*) compiledMods
{
	NSMutableArray *modules = [NSMutableArray array];
	[modules addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"storekit",@"name",@"ti.storekit",@"moduleid",@"2.1.3",@"version",@"67fdca33-590b-498d-bd4e-1fc3a8be0f37",@"guid",@"",@"licensekey",nil]];
	[modules addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"quicktigame2dmodule",@"name",@"com.googlecode.quicktigame2d",@"moduleid",@"1.2",@"version",@"43e5477d-c827-44b6-b7e3-9c1db662a652",@"guid",@"",@"licensekey",nil]];
	[modules addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"ti.cloud",@"name",@"ti.cloud",@"moduleid",@"2.3.2",@"version",@"1056b5d2-2bb5-4339-b930-297637aeec4e",@"guid",@"",@"licensekey",nil]];
	return modules;
}

@end