import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage'
import uuid from 'react-native-uuid'
import * as Sentry from 'sentry-expo'

const storage = getStorage()

export const uploadImage = async (image) => {
  if (!image) return null

  try {
    const genId = uuid.v4()
    const response = await fetch(image)
    const fileBlob = await response.blob()
    const imgName = 'img-' + genId
    const storageRef = ref(storage, `images/${imgName}.jpeg`)

    const uploadTask = uploadBytesResumable(storageRef, fileBlob)
    const downloadURL = await new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              console.log("User doesn't have permission to access the object")
              break
            case 'storage/canceled':
              console.log('User canceled the upload')
              break
            case 'storage/unknown':
              console.log('Unknown error occurred, inspect error.serverResponse')
              break
          }
          reject(error)
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          console.log('File available at', downloadURL)
          resolve(downloadURL)
        }
      )
    })
    return downloadURL
  } catch (err) {
    _captureException(error)
    console.log('Something went wrong with uploading image', err)
    return ''
  }
}

export const millisecondsToDate = (date) => {
  let formatDate = date?.seconds * 1000 + date?.nanoseconds / 1000000
  return new Date(formatDate)
}

export const _captureException = (error) => {
  Sentry.Native.captureException(error)
}
