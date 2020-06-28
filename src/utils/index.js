
function  options2formatter (theEnum) {
  const options = {}

  theEnum.forEach(item => {
    options[item.key] = item.value

  })

  return options
}


export default { options2formatter };
