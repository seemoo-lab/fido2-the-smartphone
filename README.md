# FIDO2 The Smartphone

This repository contains the mockup website used in the study published in [our paper](#our-paper).
KUUGEL is a mockup website that allows you to explore FIDO2 platform and roaming authentication on a smartphone.

<p align="center">
    <img src="https://github.com/seemoo-lab/fido2-the-smartphone/blob/main/gfx/roaming.jpg" height=400px>
    <img src="https://github.com/seemoo-lab/fido2-the-smartphone/blob/main/gfx/platform.jpg" height=400px>
    <img src="https://github.com/seemoo-lab/fido2-the-smartphone/blob/main/gfx/registration.PNG" height=400px>
    <img src="https://github.com/seemoo-lab/fido2-the-smartphone/blob/main/gfx/login.PNG" height=400px>
</p>

## Installation

We use a local network disconnected from the Internet to connect all involved parties.
The network consists of a webserver hosting the kuugel.de website, a DNS server, a wireless router, and an Apple iPhone.
This installation guide assumes you are hosting the webserver and DNS server on a Macboook.

### Disclaimer
We have only tested the mockup website on an Apple iPhone SE (2nd generation) running iOS 14.5.1 and Safari 14.1.
It has only been tested using a Yubico YubiKey 5C NFC and Apple Touch ID for the Web.
The webserver and DNS server have been hosted on an Apple Macbook Pro (2019) running macOS Catalina (10.15.7).
We have used a [Raspberry Pi 3](https://www.raspberrypi.org/) running [RaspAP](https://github.com/RaspAP/raspap-webgui) as the wireless router.

### Install the DNS Server

Two conditions require the presence of a DNS server in the local network:
- _Secure context:_ WebAuthn requires an HTTPS connection.
- _Readable URL:_ The URL field should contain kuugel.de instead of an IP address, and, the client would be unable to locate the kuugel.de IP address without a DNS server.

Therefore, we set up a DNS server using [Dnsmasq](https://dnsmasq.org) with the sole purpose of resolving the kuugel.de domain to the webserver’s IP address.

Install Dnsmasq. On macOS, this can be done using [Homebrew](https://brew.sh).
```bash
brew install dnsmasq
```

The redirection is achieved by adding one line to the configuration file of Dnsmasq.
Add this line to `/usr/local/etc/dnsmasq.conf` (`<local-ip>` is the web server's IP address):
```
address=/kuugel.de/<local-ip>
```

Next, we start the DNS server using
```bash
sudo dnsmasq
```

Go to the Macbook's advanced network settings, select the DNS tab and add the following two DNS servers (`<router-ip>` is the router's IP address):
```
127.0.0.1
<router-ip>
```

Finally, go to the iPhone's DNS settings by navigating to Settings -> WiFi -> *Info icon of the connected network* -> DNS and set `<local-ip>` as the DNS server.

## Install Website Certificates

The website uses the Web Authentication (WebAuthn) API for FIDO2 authentication.
WebAuthn requires a secure context, so we host the website with HTTPS.
As a requirement for the HTTPS connection, a trusted third party must sign the website certificate.
Therefore, we establish a certification chain consisting of two certificates:
The _server certificate_ is used to host the KUUGEL website.
The corresponding _CA certificate_ is marked as trustworthy on the iPhone, thus establishing a secure context and ensuring support for the WebAuthn API.

First, we install [mkcert](https://github.com/FiloSottile/mkcert).
```bash
brew install mkcert
```
Next, we install the local CA certificate that is used to sign the certificate for our website. You will be asked to run this as superuser.
```bash
mkcert -install kuugel.de
```

Find the local CA certificate in the Macbook's Keychain Acces (search "mkcert") and export it.
Copy the CA certificate to the iPhone. This can easily be done with Airdrop.
Follow the installation instructions on the iPhone.
Go to the iPhone's settings and navigate to Settings -> General -> Profile.
Select the CA certificate and install it.
Finally, navigate to Settings -> General -> About -> Certificate Trust Settings and enable full trust for the CA certificate.

### Host Website
First, install all dependencies.
```bash
npm install
```
Note that you might need to run the command with the "--legacy-peer-deps" option.

Compile and deploy the website.
The KUUGEL website is developed with [Vue.js](https://vuejs.org), and we use the runtime environment provided by [Node.js](https://nodejs.org/en/) to make the website accessible within the local network.
Although this feature is only recommended for development, it is sufficient for our means.
```bash
npm run serve
```

### Explore FIDO2 on the iPhone
Delete all cached website data from the iPhone and open "https://kuugel.de:9090" in Safari.

## Our Paper

* Leon Würsching[^1], Florentin Putz[^1], Steffen Haesler, Matthias Hollick. **FIDO2 the Rescue? Platform vs. Roaming Authentication on Smartphones** *Proceedings of the Conference on Human Factors in Computing Systems (CHI))*, April 23–28, 2023, Hamburg, Germany. [Paper](https://doi.org/10.1145/3544548.3580993) [Dataset](https://doi.org/10.5281/zenodo.7572697)

[^1]: equal contribution

## Acknowledgements
This work has been co-funded by the LOEWE initiative (Hesse, Germany) within the emergenCITY center and the Federal Ministry of Education and Research of Germany in the project Open6GHub (grant number: 16KISK014).


## Developer

* **Leon Würsching* ([email](mailto:lwuersching@seemoo.tu-darmstadt.de), [web](https://www.seemoo.tu-darmstadt.de/team/lwuersching/))

## License
