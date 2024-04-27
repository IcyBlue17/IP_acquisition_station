let ipinfo = {
    ip: null,
    loc: null,
    tls: null,
    http: null,
    uag: null,
    kex: null,
    colo: null,
    warp: null
};

fetch('https://ick.moe/cdn-cgi/trace')
    .then(response => response.text())
    .then(data => {
        data.split('\n')
            .map(line => line.split('='))
            .forEach(([key, value]) => {
                if (key in ipinfo) {
                    ipinfo[key] = value;
                }
            });
        document.getElementById('infoContainer').innerHTML += `
            <p>您的IP地址为 ${ipinfo.ip}</p>
            <p>您当前IP的国家代码为 ${ipinfo.loc}</p>
            <p>您当前TLS版本为 ${ipinfo.tls}</p>
            <p>您当前使用的HTTP版本为 ${ipinfo.http}</p>
            <p>您的User-Agent为 ${ipinfo.uag}</p>
            <p>您当前使用的密钥交换机制为 ${ipinfo.kex}</p>
            <p>您当前命中的Cloudflare数据中心为 ${ipinfo.colo}</p>
            ${ipinfo.warp === 'off' ? '<p>您当前没有使用Cloudflare Warp</p>' : '<p>您当前正在使用Cloudflare Warp</p>'}
        `;
    })
    .catch(error => console.error('Error fetching cdn-cgi data:', error));
