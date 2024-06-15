import { Input, GenericButton } from "../"
import { SECONDARY_LOGO } from "../../config";

export function Login() {
    // const { variant } = props;

    return (
        <>
            <div className="flex flex-col w-[40rem] h-[40rem] bg-background-color justify-center px-5 gap-2 ring-2 ring-primary rounded-lg"  >        
                <div className="flex flex-col w-[40rem] items-center justify-between">
                    <img
                        alt={`Logo ${SECONDARY_LOGO}`}
                        src={SECONDARY_LOGO}
                        className='w-48 h-48'
                    />
                    <Input isHugWidth={false} label="E-mail" mode="nude" />
                    <Input isHugWidth={false} label="E-mail" mode="nude" />    
                    <div className="flex flex-col w-[28rem] justify-center mt-24">
                        <GenericButton
                            variant='primary'
                            type='medium'
                            title='Text'
                            isHugWidth 
                        />
                    </div>
                </div>

            </div>
        </>
    );
}
