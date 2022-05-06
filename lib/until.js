export default result;

function result(body) {
  if (body?.error?.code === 200319) {
    window.location.href = '/';
  } else {
    return body;
  }
}