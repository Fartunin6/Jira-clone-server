exports.accountActivation = (token) => `
    <p>Please user the following link to activate your account</p>
    <p>${process.env.CLIENT_URL}/auth/confirm/${token}</p>
    <hr/>
    <p>Jira clone</p>
`;
