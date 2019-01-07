export default function activateSearchfieldsBehavior() {
  const firstValue = $('select.cities-searchfield > option:first-child').val();
  const lastValue = $('select.cities-searchfield > option:last-child').val();

  $('select.cities-searchfield').on('change', event => {
    const currentId = event.target.id;
    const value = event.target.value;
    const $anotherField = $(`select.cities-searchfield:not(#${currentId})`);
    const anotherValue = $anotherField.val();

    if (value == anotherValue) {
      if (value == firstValue) {
        $anotherField.selectpicker('val', lastValue);
      } else {
        $anotherField.selectpicker('val', firstValue);
      }
    }
  });

  $('select.cities-searchfield#spend').selectpicker('val', lastValue);
}
