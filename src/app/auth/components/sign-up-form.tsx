"use client";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
    confirm_password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
}).refine((data) => data.password === data.confirm_password, {
    message: "As senhas não coincidem",
    path: ["confirm_password"],
});

type FormData = z.infer<typeof formSchema>;

export const SignUpForm = () => {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirm_password: "",
        },
    });

    function onSubmit(values: FormData) {
        console.log(values);
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Criar conta</CardTitle>
                        <CardDescription>Crie uma conta para continuar</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input type="text" id="name" placeholder="Nome" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" id="email" placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input type="password" id="password" placeholder="Senha" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="confirm_password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirmar senha</FormLabel>
                                <FormControl>
                                    <Input type="password" id="confirm_password" placeholder="Confirmar senha" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">Criar conta</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}