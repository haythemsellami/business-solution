require('module-alias/register');
const http = require('http'),
    BusinessSolutionAPI = require('@BusinessSolutionAPI'),
    BusinessSolutionServer = http.Server(BusinessSolutionAPI),
    BusinessSolutionPORT = process.env.PORT || 3001,
    LOCAL = '127.0.0.1';

BusinessSolutionServer.listen(BusinessSolutionPORT, LOCAL, () => console.log(`BudgetManagerAPI running on ${BusinessSolutionPORT}`));
