const json = require('./formStruture.json');
// {
//     "SHOWRESULT": true,
//     "QUESTIONTITLE": "学生每日健康打卡2021年1月28日",
//     "HASANSWER": true,
//     "BETWEEN": "2021-01-28 05-00 至 2021-01-28 23-59",
//     "STATE": "进行中",
//     "SUBTITLE": "为更好的开展我校疫情防御工作，请师生认真填写以下内容"
//   },
const renderAnswerData = (detail) => {
  const answerData = [];
  const rows = detail && detail.rows;
  // 忽略第一项
  for (let i = 1; i < rows.length; i++) {
    const item = rows[i];
    // 三个提交字段
    const itemType = item.TYPE;
    const itemId = item.ITEMID;
    const answerArr = [];
    // 这一项本来是体温输入框,但是隐藏了
    if(item.INDEX === 'Q15') {
        continue;
    }
    // 有答案的是普通输入框
    if (item.ANSWERTEXT) {
      answerArr[0] = item.ANSWERTEXT;
    }
    // 多选框
    if (["radio","checkbox","imgRadio","imgCheckbox"].includes(itemType) && item.OPTIONS){
        const options = item.OPTIONS
        // 根据CHECKED 找到选中项
        const target = options.find( o => o.CHECKED === true)
        answerArr[0] = target.SUBID
    }
    answerData.push({ itemId, itemType, answerArr });
  }
  return answerData;
};

const myform = renderAnswerData(json)
console.log(myform)
// const realform = require('./asset/formdata.json')
// console.log(myform.length)
// console.log(realform.answerData.length)
// const bool = myform.every(item => {
//     const target = realform.answerData.find(realItem => realItem.itemId === item.itemId)
//     // console.log(item.itemId,target ? target.itemId : 'none')
//     if(target) return true
//     return false
// })
// console.log(bool)