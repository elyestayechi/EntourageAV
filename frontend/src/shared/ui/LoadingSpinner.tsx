interface LoadingSpinnerProps {
    fullScreen?: boolean;
    text?: string;
  }
  
  export function LoadingSpinner({ fullScreen = false, text = 'Loading...' }: LoadingSpinnerProps) {
    const spinner = (
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2A2522]"></div>
        {text && <p className="text-[#5A5A5A]">{text}</p>}
      </div>
    );
  
    if (fullScreen) {
      return (
        <div className="fixed inset-0 bg-[#FAFAF9] flex items-center justify-center z-50">
          {spinner}
        </div>
      );
    }
  
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        {spinner}
      </div>
    );
  }