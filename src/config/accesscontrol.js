const ac = new AccessControl();

function accessControl() {
  ac.grant('user') // define new or modify existing role. also takes an array.
    .createOwn('test') // equivalent to .createOwn('video', ['*'])
    .deleteOwn('test')
    .readAny('test')
    .grant('admin') // switch to another role without breaking the chain
    .extend('user') // inherit role capabilities. also takes an array
    .updateAny('test', ['title']) // explicitly defined attributes
    .deleteAny('test');

  const permission = ac.can('user').readAny('test')
  console.log(permission.granted); // —> true
  console.log(permission.attributes); // —> ['*'] (all attributes)

  permission = ac.can('admin').updateAny('test');
  console.log(permission.granted); // —> true
  console.log(permission.attributes); // —> ['title']
  return ac
}

module.exports = {
  accessControl
}
