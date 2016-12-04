export default function noteQualifyToBeCreated(teaNote) {
  if ((teaNote.coverImageUrl.uri !== '') && (teaNote.name !== '')) {
    return true;
  }
  return false;
}
