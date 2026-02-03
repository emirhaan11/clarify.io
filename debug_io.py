import asyncio
import os
from dotenv import load_dotenv
from services.io_ai import get_ai_response

# Force load .env from current directory
load_dotenv()

async def test():
    print("--- Debugging IO Intelligence Connection ---")
    api_key = os.getenv("IO_API_KEY")
    base_url = os.getenv("IO_BASE_URL")
    
    print(f"API Key present: {bool(api_key)}")
    print(f"Base URL: {base_url}")
    
    if not api_key:
        print("ERROR: IO_API_KEY is missing from environment!")
        return

    print("\nAttempting to call get_ai_response...")
    try:
        response = await get_ai_response("Hello, this is a test.")
        print("\nSUCCESS! Response received:")
        print("-" * 20)
        print(response)
        print("-" * 20)
    except Exception as e:
        print("\nFAILED with Exception:")
        print(e)
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test())
