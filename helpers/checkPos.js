function check_cord(cord) {
  let obj =
  [
    {type:'snake', dest:16, arival:6},
    {type:'snake', dest:49, arival:12},
    {type:'snake', dest:46, arival:26},
    {type:'snake', dest:56, arival:42},
    {type:'snake', dest:62, arival:18},
    {type:'snake', dest:65, arival:60},
    {type:'snake', dest:87, arival:20},
    {type:'snake', dest:92, arival:69},
    {type:'snake', dest:97, arival:79},
    {type:'ladder', dest:4, arival:15},
    {type:'ladder', dest:9, arival:31},
    {type:'ladder', dest:21, arival:42},
    {type:'ladder', dest:28, arival:83},
    {type:'ladder', dest:36, arival:44},
    {type:'ladder', dest:51, arival:63},
    {type:'ladder', dest:71, arival:92},
    {type:'ladder', dest:83, arival:95},
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
