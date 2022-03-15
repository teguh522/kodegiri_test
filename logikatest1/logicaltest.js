const arr = [11, 12, "cii", 001, 2, 1998, 7, 89, "iia", "fii"]
const getstr = arr.filter(x => typeof x === "string")

function renderdata(params) {
    const obj = {}
    params.forEach((element) => {
        obj[element] = element.split("")
    });
    console.log(obj);
}
renderdata(getstr)