import Devit from '@/components/Devit'
import NavLayout from '@/components/NavigationLayout'
import { databaseAdmin } from '@/firebase/admin'
import { DATABASES } from '@/firebase/client'

export default function DevitPage (props) {
  return (
    <>
      <style jsx>{`
        article {
          flex: 1
          }

        :global(nav) {
            padding-right: 18px;
          }
        `}
      </style>
      <NavLayout title='See Devit'>
        <article>
          <Devit {...props} />
        </article>
      </NavLayout>
    </>
  )
}

export async function getServerSideProps ({ params }) {
  const { id } = params
  const snapshot = await databaseAdmin.collection(DATABASES.DEVITS).get()

  const selectedDevit = snapshot.docs.filter(doc => doc.id === id)[0]

  const data = await selectedDevit.data()
  const { createdAt } = data

  return {
    props: {
      ...data,
      id,
      createdAt: +createdAt.toDate()
    }
  }
}
