export default function extractWidgets(json) {
    const widgets = []
    json.children.forEach(element => {
      if (element.type === 'widget') {
        widgets.push(element)
      } else {
        // eslint-disable-next-line no-prototype-builtins
        if (element.hasOwnProperty('children')) {
          extractWidgets(element)
        }
      }
    })
    console.log(widgets);
    return widgets
  }