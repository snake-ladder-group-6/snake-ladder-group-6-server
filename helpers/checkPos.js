function check_cord(cord) {
  let obj = 
  [
    {type:'snake', dest:12, arival:5},
    {type:'ladder', dest:23, arival:49},
    {type:'snake', dest:56, arival:19},
    {type:'ladder', dest:45, arival:79}
  ]
  for (let i in obj) {
    if (cord == obj[i].dest) {
      if (obj[i].type == 'snake') {
        return {type: obj[i].type, stepCount: (obj[i].dest - obj[i].arival)}
      } else {
        return {type: obj[i].type, stepCount: (obj[i].arival - obj[i].dest)}
      }
    } else {
      return false
    }
  }
}

module.exports = {check_cord}
