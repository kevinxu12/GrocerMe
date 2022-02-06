import { RoleCode } from "types/rest";
import { isPathAuthenticated } from "utils/auth";
import { Constants } from "utils/constants";

describe('check auth helpers', () => {
  it('should check isAuthenticated correctly returns true for admin role', () => {
    const roles = [{_id: "123", code: RoleCode.ADMIN, status: true}, { _id: "123", code: RoleCode.CONSUMER, status: true}];
    const path = Constants.ADMIN_HOME;
    expect(isPathAuthenticated(path, roles)).toEqual(true);
  });
  it('should check isAuthenticated correctly returns true for consumer role', () => {
    const roles = [{code: RoleCode.ADMIN, status: true}, { code: RoleCode.CONSUMER, status: true}];
    const path = Constants.USER_HOME;
    expect(isPathAuthenticated(path, roles)).toEqual(true);
  });
  it('should check isAuthenticated correctly returns false for admin role', () => {
    const roles = [ { c_id: "123", code: RoleCode.CONSUMER, status: true}];
    const path = Constants.ADMIN_HOME;
    expect(isPathAuthenticated(path, roles)).toEqual(false);
  });
  it('should check isAuthenticated correctly returns false for admin role', () => {
    const roles = [];
    const path = Constants.HOME_URL;
    expect(isPathAuthenticated(path, roles)).toEqual(true);
  });
});
