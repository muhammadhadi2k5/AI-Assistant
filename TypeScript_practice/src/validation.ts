export function validateStudentInput(name: string, age: number, email: string): void {
    if (name === undefined || name === null || name.trim().length === 0) {
        throw new Error("Name cannot be empty.");
    }

    if (name.trim().length < 2) {
        throw new Error("Name must be at least 2 characters long.");
    }

    if (age === undefined || age === null) {
        throw new Error("Age is required.");
    }

    if (age <= 0) {
        throw new Error("Age must be a positive number.");
    }

    if (age > 120) {
        throw new Error("Age must be a realistic number (120 or less).");
    }

    if (email === undefined || email === null || email.trim().length === 0) {
        throw new Error("Email cannot be empty.");
    }

    if (email.includes("@") === false) {
        throw new Error("Email must contain an '@' symbol.");
    }

    if (email.includes(".") === false) {
        throw new Error("Email must contain a valid domain (e.g. '.com').");
    }
}