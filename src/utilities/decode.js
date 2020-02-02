export default function decode_text(encoded_text){
  var elem = document.createElement('textarea');
  elem.innerHTML = encoded_text;
  var val = elem.value
  return val
}
