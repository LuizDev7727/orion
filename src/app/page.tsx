'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useActionState } from "react"
import { getAnswerAction } from "./actions"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {

  const initialState = {
    answer: '',
    error: ''
  }

  const [state, formAction, pending] = useActionState(getAnswerAction, initialState)

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[440px] h-[700px] grid grid-rows-[min-content_1fr_min-content]">
        <CardHeader>
          <CardTitle>Orion AI</CardTitle>
          <CardDescription>Tudo para saber sobre a empresa está aqui.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] space-y-4 w-full pr-4">
            {
              pending ?
                <div className="flex gap-2 text-slate-600 text-sm">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              :
              state.answer.length > 0 && (
                <div className="flex gap-2 text-slate-600 text-sm">
                  <Avatar>
                    <AvatarFallback>MC</AvatarFallback>
                    <AvatarImage src={'https://github.com/microsoft.png'}/>
                  </Avatar>
                  <p className="leading-relaxed">
                    <span className="block font-bold text-slate-700">
                      Orion:
                    </span>
                    {
                      state.answer
                    }
                  </p>
                </div>
              ) 
            }
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form action={formAction} className="w-full flex items-center gap-x-2">
            <Input id="question" name="question" readOnly={pending} placeholder="Qual a sua pergunta ?"/>
            <Button type="submit" size={'sm'} variant={'outline'} disabled={pending}>
              <Send />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}