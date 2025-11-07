import { getAllBilik } from "@/action/bilik/get-all-bilik";
import { BilikLoginForm } from "@/components/domain/bilik/form/bilik-login-form";

export default async function BilikLogin() {
    const biliks = await getAllBilik();

    return (
        <div className="h-screen flex items-center justify-center">
            <BilikLoginForm biliks={biliks.data} />
        </div>
    );
}
