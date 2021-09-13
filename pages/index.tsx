import { List, ListItem, Divider, Heading, Input, Box, Center, Text, Avatar, Stack, Checkbox, } from '@chakra-ui/react'
import { motion, useAnimation } from 'framer-motion';
import type { NextPage } from 'next'
import React, {FormEvent, useEffect, useState} from 'react'

const Home: NextPage = () => {

  // state for type on input 
  const [ todo, setTodo ]  = useState<string>('');

  // const [ todoList, setTodoList ] = useState<Array<string>>(['1', '2']);
  //  1, 2 akan tampil di list

  // state for list
  const [ todoList, setTodoList ] = useState<Array<string>>([]);

  function onSubmitHandler(e: FormEvent<HTMLFormElement>){
  e.preventDefault();
  if (todo.length < 3) 
  return;
  // spread operator untuk memanggil array
  setTodoList([
    ...todoList,
    todo
  ])
  setTodo('');
  }


  function removeItemAt(index: number){
    setTodoList(
      todoList.filter((_, i) => i !== index)
    )
  }
  return (
    <Box backgroundColor={'grey'} height={'100vh'} width={'100%'}>
      <Center height={'100%'}>
        <Box padding={'3'} borderRadius={'md'} shadow={'md'} width={'96'} minHeight={'40'} backgroundColor={'blue.200'}>
          <Stack direction={'row'}justifyContent="space-between" >
            <Heading size={'md'}>✨My Todo List✨</Heading>
            <Avatar src="https://th.bing.com/th/id/OIP.QmGjyEZZV9tpKWGOsH7ZkgHaLH?pid=ImgDet&rs=1" size="sm" />
          </Stack>
          <Divider paddingY ={'1'} />
            <form onSubmit={onSubmitHandler}>
              <Input value={todo} onChange={e => setTodo(e.currentTarget.value)} />
            </form>
            <Divider paddingY ={'1'} />
            <Box p={3}>
              <Text fontSize="md" fontWeight="semibold">My List 🍁</Text>
                <List>
                  {todoList.map((v,i) => (
                  <ItemComponents key={i} value={v} onChange={()  => removeItemAt(i)}/>
                   ))}
                </List>
            </Box>
        </Box>
      </Center>
    </Box> 
  )
}

export default Home

interface IItemComponents {
  value?:string,
  onChange?: () => void,
}

const ItemComponents = (props:IItemComponents) => {

  const [checked, setChecked] = useState<boolean>(false);
  const animController = useAnimation()
  function onChangeHandler() {
    setChecked(true);
    
    setTimeout(async () => {
      await animController.start({
        opacity: 0,
      })
      props?.onChange?.();
      setChecked(false);
      await animController.start({
        opacity:1,
     
      })
    }, 200)
  }

  useEffect(() => {
    animController.start({
      // opacity 0,7 ke 1 
      opacity: [.7,1],
      // ambil data dari bawah ke posisi yg sebenarnya
      y: [3,0],
      // transisi
      transition: {
        duration: .2,
      }
    });
  }, []);
  
  return (
    <ListItem>
      <motion.div animate={animController}>
        <Checkbox isChecked={checked} onChange={onChangeHandler}>{props?.value}</Checkbox>
      </motion.div>
    </ListItem>
  )
}