const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const changeStar = stars =>{
	let num = stars.toString().slice(0,1);
	let arr = [];
	console.log('num',num);
	for(let i=1;i<=5;i++){
		if(i<=num){
			arr.push(1);
		}else{
			arr.push(0);
		}
	}
//	console.log(arr);
	return arr
}
module.exports = {
  formatTime: formatTime,
  changeStar: changeStar
}
