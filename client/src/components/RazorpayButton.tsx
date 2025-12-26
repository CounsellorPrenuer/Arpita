import { useEffect, useRef } from 'react';

interface RazorpayButtonProps {
    paymentButtonId: string;
}

export default function RazorpayButton({ paymentButtonId }: RazorpayButtonProps) {
    const containerRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Clear previous scripts if any (though this component should just mount once)
        containerRef.current.innerHTML = '';

        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/payment-button.js";
        script.dataset.payment_button_id = paymentButtonId;
        script.async = true;

        containerRef.current.appendChild(script);

        return () => {
            // Cleanup not strictly necessary for script tags inside a form that's being removed,
            // but good practice to ensure no side effects.
        };
    }, [paymentButtonId]);

    return (
        <form ref={containerRef} className="flex justify-center mt-4">
            {/* Script will inject button here */}
        </form>
    );
}
