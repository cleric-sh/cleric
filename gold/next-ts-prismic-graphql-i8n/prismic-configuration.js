// -- Prismic API endpoint
// Determines which repository to query and fetch data from
// Configure your site's access point here

const repoName = `hki-decompression`
const repoUrl = `https://${repoName}.cdn.prismic.io`;
const apiEndpoint = `${repoUrl}/api/v2`
const graphqlEndpoint = `${repoUrl}/graphql`

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
const accessToken = ''

// -- Link resolution rules
// Manages the url links to internal Prismic documents
const linkResolver = (doc) => {
  if (doc.type === 'page') {
    return `/${doc.lang}/${doc.uid}`;
  }
  if (doc.type === 'homepage') {
    return `/${doc.lang}`;
  }
  return '/';
}

// Additional helper function for Next/Link components
const hrefResolver = (doc) => {
  if (doc.type === 'page') {
    return `/${doc.lang}/${doc.uid}`;
  }
  if (doc.type === 'homepage') {
    return `/${doc.lang}`;
  }
  return '/';
}

module.exports = {
  repoName,
  repoUrl,
  apiEndpoint,
  graphqlEndpoint,
  accessToken,
  linkResolver,
  hrefResolver
}
