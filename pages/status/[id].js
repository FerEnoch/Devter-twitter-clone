import Devit from '@/components/Devit'
import NavLayout from '@/components/NavigationLayout/NavLayout'

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

export async function getServerSideProps (context) {
  // params, req, res, query
  const { params, res } = context
  const { id } = params
  const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`)

  if (!apiResponse.ok || !res) {
    return {
      redirect: {
        destination: '/home',
        permanent: false
      }
    }
  }

  const props = await apiResponse.json()
  return { props }
}
