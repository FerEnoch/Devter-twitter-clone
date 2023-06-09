import { databaseAdmin } from '@/firebase/admin'
import { DATABASES } from '@/firebase/client'

export default async function api (request, response) {
  const { query } = request
  const { id } = query

  databaseAdmin
    .collection(DATABASES.DEVITS)
    .get()
    .then(snapshot => {
      snapshot.docs
        .filter(doc => doc.id === id)
        .map(doc => {
          const data = doc.data()
          const { createdAt } = data
          return response.status(200).json({
            ...data,
            id,
            createdAt: +createdAt.toDate()
          })
        })
    })
    .catch(() => response.status(404).end())
}
