const percent2percent25 = (URI) => {
  if (URI.indexOf('%') > -1) {
    return URI.replace(/%/g, '%25');
  } else {
    return URI;
  }
};
const obj = { id: 1, item: '中文' };
const encode = encodeURIComponent(JSON.stringify(obj));
const decode = decodeURIComponent(encode);
console.log('encode', encode);

console.log('decode', decode);

// $.ajax({
//     url: "../../questionnaireSurvey/addQuestionnaireRecord",
//     method: "POST",
//     data: {
//         "questionnaireId": questionnaireId,
//         "userId": userId,
//         "answerData": JSON.stringify(answer)
//     },
let answerData =
  '%7B%22answerData%22%3A%5B%7B%22itemId%22%3A%228361061f-10f3-4ee3-be9c-2f2e25fd7bc7%22%2C%22itemType%22%3A%22radio%22%2C%22answerArr%22%3A%5B%228b0a76d7-068e-42cc-ac78-17c348d0dc35%22%5D%7D%2C%7B%22itemId%22%3A%22d4899704-c57e-46f1-85cf-4fdbd45f8f86%22%2C%22itemType%22%3A%22checkbox%22%2C%22answerArr%22%3A%5B%223f30a73f-3343-4581-aa46-20df78d83e06%22%5D%7D%2C%7B%22itemId%22%3A%2278109eba-b956-40d8-b73b-c7d2e58c1f64%22%2C%22itemType%22%3A%22checkbox%22%2C%22answerArr%22%3A%5B%22d7a8fe9f-d41b-4818-81b2-9613b0e9a328%22%5D%7D%2C%7B%22itemId%22%3A%2290e402dd-2a39-4186-b121-e5bed72c26f5%22%2C%22itemType%22%3A%22checkbox%22%2C%22answerArr%22%3A%5B%22d682c087-0894-4a43-b76a-0da71829ce14%22%5D%7D%2C%7B%22itemId%22%3A%2201530259-be6a-4227-8499-509a686a7f63%22%2C%22itemType%22%3A%22radio%22%2C%22answerArr%22%3A%5B%22a8e4ed88-56b1-4f59-9ff7-a3bb438ca2b1%22%5D%7D%2C%7B%22itemId%22%3A%222a378c14-b09a-48d0-94cc-6064addb8cc2%22%2C%22itemType%22%3A%22radio%22%2C%22answerArr%22%3A%5B%22ac88b1e7-9aa4-43b7-8598-9fcf7576de92%22%5D%7D%2C%7B%22itemId%22%3A%221fd58cba-66b0-4039-a817-b3215421bfa5%22%2C%22itemType%22%3A%22radio%22%2C%22answerArr%22%3A%5B%226cdba918-4ad6-424f-9dfc-8b9e93f3cee7%22%5D%7D%2C%7B%22itemId%22%3A%2249580ff4-186f-4709-8132-62ebd22cb816%22%2C%22itemType%22%3A%22radio%22%2C%22answerArr%22%3A%5B%22569f414d-3a23-4945-a95a-bba708f9745d%22%5D%7D%2C%7B%22itemId%22%3A%22aac61f5f-075f-469c-9f9c-b64bf19c8896%22%2C%22itemType%22%3A%22radio%22%2C%22answerArr%22%3A%5B%22dad07e3e-1bff-4e5c-af0a-a8b8f68a83e7%22%5D%7D%2C%7B%22itemId%22%3A%22cafdef0f-9fb7-41f5-9e6b-4a02ce2e910d%22%2C%22itemType%22%3A%22radio%22%2C%22answerArr%22%3A%5B%22bd052bc9-eb01-46cd-bded-e5dfe12a65ff%22%5D%7D%2C%7B%22itemId%22%3A%22b00a7a13-dc6e-4ce0-978d-13244ca31af4%22%2C%22itemType%22%3A%22radio%22%2C%22answerArr%22%3A%5B%228436189b-c15a-4d0e-acf7-41e98048025b%22%5D%7D%2C%7B%22itemId%22%3A%222eafcf75-b717-4bd5-9030-6d9eccc8f7f7%22%2C%22itemType%22%3A%22radio%22%2C%22answerArr%22%3A%5B%2273aa6ab0-47ac-49d3-ba9a-bafd7dfef4b1%22%5D%7D%2C%7B%22itemId%22%3A%224582393c-0d73-4096-9d43-95e5ffa1e605%22%2C%22itemType%22%3A%22radio%22%2C%22answerArr%22%3A%5B%2284f1b336-34d2-4699-a014-4db6b8fbc577%22%5D%7D%2C%7B%22itemId%22%3A%2291f8d7ab-aeae-4281-81e2-da17691036cf%22%2C%22itemType%22%3A%22radio%22%2C%22answerArr%22%3A%5B%223d13dd78-042b-4a60-b96f-dca992cbffe1%22%5D%7D%2C%7B%22itemId%22%3A%22ea77897c-c46f-4fcd-ab84-8c0a69f3698d%22%2C%22itemType%22%3A%22radio%22%2C%22answerArr%22%3A%5B%22994bdb64-4c2a-4cf9-8cef-34988d79cf48%22%5D%7D%2C%7B%22itemId%22%3A%22cb9e1085-2f9b-4810-bdc1-ca26478a3f93%22%2C%22itemType%22%3A%22radio%22%2C%22answerArr%22%3A%5B%223ef0892e-9da6-4206-be30-c38ebf243b02%22%5D%7D%2C%7B%22itemId%22%3A%22725111da-9a99-4add-b627-e26308b695bc%22%2C%22itemType%22%3A%22radio%22%2C%22answerArr%22%3A%5B%22fa2fec8c-9237-40cd-ac83-63d7d153fb8c%22%5D%7D%2C%7B%22itemId%22%3A%224461e85d-de93-4560-b5fd-24aca226da3c%22%2C%22itemType%22%3A%22textFill%22%2C%22answerArr%22%3A%5B%2215058341798%22%5D%7D%2C%7B%22itemId%22%3A%220dc78408-8d08-48e1-8e55-8f689fd701ab%22%2C%22itemType%22%3A%22textFill%22%2C%22answerArr%22%3A%5B%22%E7%8E%8B%E6%99%93%E7%87%95%22%5D%7D%2C%7B%22itemId%22%3A%22d680ecc7-2280-4fc3-b7e9-f62b5600d387%22%2C%22itemType%22%3A%22textFill%22%2C%22answerArr%22%3A%5B%2215258621598%22%5D%7D%2C%7B%22itemId%22%3A%22234516a0-f2c5-40af-97ff-8877fc726171%22%2C%22itemType%22%3A%22textFill%22%2C%22answerArr%22%3A%5B%2236%22%5D%7D%2C%7B%22itemId%22%3A%228196b97e-da32-4519-92d1-39415c6a7be1%22%2C%22itemType%22%3A%22areaFill%22%2C%22answerArr%22%3A%5B%22%E6%B5%99%E6%B1%9F%E7%9C%81%2C%E6%B8%A9%E5%B7%9E%E5%B8%82%2C%E8%8B%8D%E5%8D%97%E5%8E%BF%2C%E7%81%B5%E6%BA%AA%E9%95%87%E6%B2%AA%E5%B1%B1%E8%A1%9768%22%5D%7D%2C%7B%22itemId%22%3A%2286a2637a-0a67-454d-a587-8f3f0338a75b%22%2C%22itemType%22%3A%22areaFill%22%2C%22answerArr%22%3A%5B%22%E6%B5%99%E6%B1%9F%E7%9C%81%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%BB%A8%E6%B1%9F%E5%8C%BA%E8%A5%BF%E5%85%B4%E8%A1%97%E9%81%93%E8%81%94%E6%85%A7%E8%A1%97188%E5%8F%B7%E5%AE%89%E6%81%92%E5%A4%A7%E5%8E%A6%22%5D%7D%2C%7B%22itemId%22%3A%22ae50a25d-2cf1-4a45-bd0c-eb5a9bb00ab8%22%2C%22itemType%22%3A%22areaFill%22%2C%22answerArr%22%3A%5B%22%22%5D%7D%2C%7B%22itemId%22%3A%2232b7398a-1a80-489c-8708-1e8d9e778972%22%2C%22itemType%22%3A%22areaFill%22%2C%22answerArr%22%3A%5B%22%22%5D%7D%2C%7B%22itemId%22%3A%22f56f072b-246d-4a86-8884-dc7422cd938c%22%2C%22itemType%22%3A%22areaFill%22%2C%22answerArr%22%3A%5B%22%22%5D%7D%2C%7B%22itemId%22%3A%22ed4479c4-ed2c-4bbd-b099-46fbe26438b8%';

console.log(decodeURIComponent(answerData.replace(/%/g, '%25')));
