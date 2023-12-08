import { Badge, Card, Button, TextInput, Title } from "@tremor/react";
import { useUserActions } from "../hooks/useUserActions";
import { useState } from "react";

export const AddNewUserForm = () => {
	const { addUser } = useUserActions();
    const [result, setResult] = useState<'ok' | 'ko' | null>(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		const form = event.target;
		const formData = new FormData(form);

		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

        if (!name || !email || !github) {
            setResult('ko');
			return;
        }

        addUser({ name, email, github });
        setResult('ok');
        form.reset();
	};

	return (
		<Card>
			<Title>Add New User</Title>
			<form onSubmit={handleSubmit}>
				<TextInput
                    name="name"
                 placeholder="full name" />
				<TextInput
                name="email"
                 placeholder="e-mail" />
				<TextInput 
                name="github"
                placeholder="GitHub User" />
				<Button type="submit">Add</Button>
                <span>
                    {result === 'ok' && (<Badge style={{color: "green"}}>Saved</Badge>) }
                    {result === 'ko' && <Badge style={{color: "red"}}>Error</Badge> }
                    </span>
			</form>
		</Card>
	);
};
