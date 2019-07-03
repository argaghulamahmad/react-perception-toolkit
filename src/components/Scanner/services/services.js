export const redirectToTokopediaPage = url => {
    console.log('redirectToTokopediaPage');

    let anyTokopediaLinkRegex = /(?:https:\/\/)?m\.?tokopedia\.?com(?:(?:[^' '\n\r]+v=)|(?:[^' '\n\r&#]*\/))([^' '\n\r&#]+)(?:&[^' '\n\r]+)?|(?:https:\/\/)?w{0,3}\.?tokopedia\.?com(?:(?:[^' '\n\r]+v=)|(?:[^' '\n\r&#]*\/))([^' '\n\r&#]+)(?:&[^' '\n\r]+)?|(?:http:\/\/)?m\.?tokopedia\.?com(?:(?:[^' '\n\r]+v=)|(?:[^' '\n\r&#]*\/))([^' '\n\r&#]+)(?:&[^' '\n\r]+)?|(?:http:\/\/)?w{0,3}\.?tokopedia\.?com(?:(?:[^' '\n\r]+v=)|(?:[^' '\n\r&#]*\/))([^' '\n\r&#]+)(?:&[^' '\n\r]+)?/;
    if (anyTokopediaLinkRegex.test(url)) {
        window.open(url, '_blank');
    } else {
        alert('Kode QR yang Anda scan invalid')
    }
};
