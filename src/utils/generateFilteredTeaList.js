/**
 * generateFilteredTeaList
 * - a function to filter input teaList
 * @param keyword {string}
 * @param teaList {array[teaObject]}
 *
 * issue: check if keyword is a substring of a certain tea
 */

const re = /\w+/;

export default function generateFilteredTeaList(keyword, teaList) {
  const filteredTeaList = teaList.filter((tea) => {
    let teaName = tea.name;
    teaName = teaName.replace(re, teaName.toLowerCase());
    const keyword_processed = keyword.replace(re, keyword.toLowerCase());

    if (teaName.includes(keyword_processed)) {
      return tea;
    }
  }).slice();
  return filteredTeaList;
}
