export async function getServerSideProps(context: { query: any }) {
  const { path, outputCurrency, inputCurrency } = context.query
  if (Array.isArray(path))
  //   if (path[0]?.toLowerCase() === 'swap') {
  //     if (outputCurrency) {
  //       return {
  //         redirect: {
  //           destination: `https://dex.apeswap.finance/swap?outputCurrency=${outputCurrency}`,
  //           permanent: false,
  //         },
  //       }
  //     }
  //     if (inputCurrency) {
  //       return {
  //         redirect: {
  //           destination: `https://dex.apeswap.finance/swap?inputCurrency=${inputCurrency}`,
  //           permanent: false,
  //         },
  //       }
  //     }
  //     return {
  //       redirect: {
  //         destination: `https://dex.apeswap.finance/swap`,
  //         permanent: false,
  //       },
  //     }
  //   }
  // if (path[0]?.toLowerCase() === 'add-liquidity') {
  //   return {
  //     redirect: {
  //       destination: 'https://dex.apeswap.finance/add-liquidity',
  //       permanent: false,
  //     },
  //   }
  // }
  // if (path[0]?.toLowerCase() === 'liquidity') {
  //   return {
  //     redirect: {
  //       destination: 'https://dex.apeswap.finance/liquidity',
  //       permanent: false,
  //     },
  //   }
  // }
  // if (path[0]?.toLowerCase() === 'zap') {
  //   return {
  //     redirect: {
  //       destination: 'https://dex.apeswap.finance/zap',
  //       permanent: false,
  //     },
  //   }
  // }
  if (path[0]?.toLowerCase() === 'iao') {
    return {
      redirect: {
        destination: 'https://legacy.apeswap.finance/iao',
        permanent: false,
      },
    }
  }
  if (path[0]?.toLowerCase() === 'maximizers') {
    return {
      redirect: {
        destination: 'https://legacy.apeswap.finance/maximizers',
        permanent: false,
      },
    }
  }
  if (path[0]?.toLowerCase() === 'the-migration') {
    return {
      redirect: {
        destination: 'https://legacy.apeswap.finance/the-migration',
        permanent: false,
      },
    }
  }
  if (path[0]?.toLowerCase() === 'info') {
    return {
      redirect: {
        destination: 'https://legacy.apeswap.finance/info',
        permanent: false,
      },
    }
  }
  if (path[0]?.toLowerCase() === 'remove' && path[1] && path[1].length > 0 && path[2] && path[2].length > 0) {
    return {
      redirect: {
        destination: `https://dex.apeswap.finance/remove/${path[1]}/${path[2]}`,
        permanent: false,
      },
    }
  }
  if (path[0]?.toLowerCase() === 'admin-pools') {
    return {
      redirect: {
        destination: 'https://legacy.apeswap.finance/admin-pools',
        permanent: false,
      },
    }
  }

  // For all other paths, redirect to the home page.
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  }
}

export default function Page() {
  // This will never actually be shown, because all paths are redirected.
  return null
}
