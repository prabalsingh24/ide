import firebase from 'firebase'

const config = process.env.firebase
firebase.initializeApp(config);

export const getRef = async function (key) {
  let ref = firebase.database().ref();

  if (key)
    ref = ref.child(`codePair/${key}`)
  else
    throw new Error('Must specify a key to get reference')

  await ref.once('value').then((snapshot) => {
    if(snapshot.exists()) {
      alert('Code pairing session started')
    }
    else {
      alert('Code pair id is incorrect')
      window.location = "/"
    }
  });
  return ref
}
