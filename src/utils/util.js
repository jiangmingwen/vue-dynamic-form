/**
 * @param key 必传
 *  v-decorator="
 * ['Is_Unsuitable_Exercise',
 * { rules: [{ required: true, message: '必选!' }]
 * }]"
 */

export function WithDecorator(key, required = false, value = "") {
  let Arr = [key],
    Obj = {};
  if (required) {
    Obj.rules = [];
    Obj.rules.push({ required: required, message: value + "必填！" });
    Arr.push(Obj);
  }
  return Arr;
}
