require('module-alias/register');
const http = require('http'),
    BusinessSolutionAPI = require('@BusinessSolutionAPI'),
    BusinessSolutionServer = http.Server(),
    BusinessSolutionPORT = process.env.PORT || 3001,
    LOCAL = '0.0.0.0';

BusinessSolutionServer.listen(BusinessSolutionPORT, LOCAL, () => console.log(`BudgetManagerAPI running on ${BusinessSolutionPORT}`));
