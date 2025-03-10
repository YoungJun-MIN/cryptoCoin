import { useError } from "@/context/ErrorContext";
export default function Error() {
  const { errorMessage } = useError();
  return(
    <>
      <div>{errorMessage}: Too Many Request</div>
    </>
  )
}