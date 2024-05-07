export async function getServerSideProps(ctx) {
  // // Fetch data from external API
  // const res = await fetch('https://api.github.com/repos/vercel/next.js');
  // const repo = await res.json();
  // // Pass data to the page via props
  // return { props: { repo } };

  // Parse token
  // const token = ctx.req.headers['Authorization'].replace('Bearer ', '');

  /**
    Determine source IP address. Alternative methods to determine source IP address may be necessary
    depending on the hosting infrastructure
   **/
  const sourceIpAddress = ctx.req.headers['x-forwarded-for'];

  console.log('sourceIpAddress: ', sourceIpAddress);

  // Check if user is allowed to access the page based on current configuration and source IP address
  if (sourceIpAddress === '::1') {
    // Deny access
    ctx.req.statusCode = 403;
    // ctx.res.end();

    return {
      redirect: {
        permanent: true,
        destination: '/login',
      },
      props: { data: 'tu nguyen' },
    };
  }

  return { props: { repo: { stargazers_count: 100 } } };
}

export default function Page({ repo }) {
  return (
    <main>
      <p>{repo.stargazers_count}</p>
    </main>
  );
}
