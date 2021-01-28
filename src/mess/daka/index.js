const fetch = require('node-fetch');
const chalk = require('chalk');
const api = 'https://daka.zcmu.edu.cn/questionnaireSurvey';
const { URLSearchParams } = require('url');

const params = new URLSearchParams();
const request = (url = '', body = {}) => {
  Object.entries(body).forEach(([key, value]) => {
    params.append(key, value);
  });
  return new Promise((resolve, reject) => {
    fetch(url, { method: 'post', body: params })
      .then((response) => response.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};
const getQuesId = (userId) =>
  request(`${api}/queryQuestionnairePageList`, {
    pageNum: 1,
    nodataFlag: false,
    pageSize: 10,
    userId,
  });
const getQuesDetail = (questionnaireId, userId) =>
  request(`${api}/queryQuestionnaireDetail`, {
    questionnaireId,
    userId,
  });
const add = (questionnaireId, userId, answerData) =>
  request(`${api}/addQuestionnaireRecord`, {
    questionnaireId,
    userId,
    answerData
  });
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
    if (item.INDEX === 'Q15') {
      continue;
    }
    // 有答案的是普通输入框
    if (item.ANSWERTEXT) {
      answerArr[0] = item.ANSWERTEXT;
    }
    // 多选框
    if (
      ['radio', 'checkbox', 'imgRadio', 'imgCheckbox'].includes(itemType) &&
      item.OPTIONS
    ) {
      const options = item.OPTIONS;
      // 根据CHECKED 找到选中项
      const target = options.find((o) => o.CHECKED === true);
      answerArr[0] = target.SUBID;
    }
    answerData.push({ itemId, itemType, answerArr });
  }
  return answerData;
};
async function run() {
  const USERID = '201912243102025';
  console.log(chalk.magenta(' ---RUN---'));

  console.log(chalk.green('学号', USERID));
  try {
    console.log(chalk.green('正在获取表单id...'));
    const quesInfo = await getQuesId(USERID);
    const questionnaireId = quesInfo?.rows?.length > 0 && quesInfo.rows[0].ID;
    console.log('表单id:', chalk.cyan(questionnaireId));

    console.log(chalk.green('正在获取表单详情...'));
    const detail = await getQuesDetail(questionnaireId, USERID);
    console.log('字段个数:', chalk.cyan(detail.rows.length));

    console.log(chalk.green('正在生成提交字段..'));
    const answerData = renderAnswerData(detail);
    console.log('提交字段个数:', chalk.cyan(answerData.length));

    console.log(chalk.yellow('发请求...'));
    const answerJSON = JSON.stringify({answerData})
    const res = await add(questionnaireId, USERID,answerJSON)
    if(res.rspcode == 000000) {
        console.log(chalk.green('成功'))
    }
  } catch (e) {
    console.log(chalk.red(e));
  }
}
run();
