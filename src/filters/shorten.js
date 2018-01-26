export function shorten (value, length) {
  if (!value && value !== null) return ''
  length = length != null ? length : 10
  if (value.length > length) {
    return value.substring(0, length) + '...'
  } else {
    return value
  }
}
