import { RoleCode } from "types/rest";
import { isPathAuthenticated } from "utils/auth";
import { Constants } from "utils/constants";

describe('check auth helpers', () => {
  it('should check isAuthenticated correctly returns true for admin role', () => {
    const roles = [RoleCode.ADMIN, RoleCode.CONSUMER];
    const path = Constants.ADMIN_HOME;
    expect(isPathAuthenticated(path, roles)).toEqual(true);
  });
  it('should check isAuthenticated correctly returns true for consumer role', () => {
    const roles = [RoleCode.ADMIN, RoleCode.CONSUMER];
    expect(isPathAuthenticated(Constants.USER_HOME, roles)).toEqual(true);
    expect(isPathAuthenticated(Constants.SUPPLIER_HOME, roles)).toEqual(true);
  });
  it('should check isAuthenticated correctly returns false for admin role', () => {
    const roles = [RoleCode.CONSUMER];
    expect(isPathAuthenticated(Constants.ADMIN_HOME, roles)).toEqual(false);
    expect(isPathAuthenticated(Constants.USER_HOME, roles)).toEqual(true);
    expect(isPathAuthenticated(Constants.SUPPLIER_HOME, roles)).toEqual(true);
  });
  it('should check isAuthenticated correctly returns true for no role', () => {
    const roles = [];
    const path = Constants.HOME_URL;
    expect(isPathAuthenticated(path, roles)).toEqual(true);
  });
});
