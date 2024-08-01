import { Spinner } from '@chakra-ui/react'

function Loading() {
  return (
    <div style={{width:"100%",height:"80vh",display:"flex",alignItems:"center",justifyContent:"center" ,flexDirection:"column",gap:"2rem"}}>
    <Spinner width={"100px"} height={"100px"}
  thickness='7px'
  speed='0.65s'
  emptyColor="#12DAA8 "
  color='rgb(46, 46, 46)'
  size='xl'

/> 
<h3>Loadind.........</h3>
</div>
  )
}

export default Loading
