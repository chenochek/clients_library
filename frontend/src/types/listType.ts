export default interface ListType {
    name: {
        title: string;
        first: string;
        middle: string | null;
        last: string;
    };
    email: string | null;
    number: string;
    link: string;
}