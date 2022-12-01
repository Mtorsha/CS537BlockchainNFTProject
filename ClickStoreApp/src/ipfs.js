import { create } from 'ipfs-http-client'

const projectId = '2IHQ2CpsJchOZdBYUA6zmPfO5lA';
const projectSecret = 'c3f13c4c0fe65f561480dcae8c364267';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0',
  headers: {
    authorization: auth,
  }
})

export default ipfs;
