export const getGoogleJsonSheet = async (sheetId) => {
  return fetch(`https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`)
      .then(res => res.text())
      .then(text => JSON.parse(text.substr(47).slice(0, -2)))
}
