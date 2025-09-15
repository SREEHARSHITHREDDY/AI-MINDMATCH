import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Users, Mail, ArrowLeft, Share2 } from "lucide-react";

interface ConfirmationProps {
  userName: string;
  onBack: () => void;
}

export function Confirmation({ userName, onBack }: ConfirmationProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <Card className="glass-card border-0 slide-up">
          <CardHeader className="text-center pb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 rounded-full bg-success/10 gentle-float">
                <CheckCircle className="h-16 w-16 text-success" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-3">
              Registration Successful!
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Thank you {userName}, your profile has been successfully saved.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="text-center space-y-8">
            <div className="bg-primary-light/50 rounded-lg p-6 glass">
              <h3 className="text-xl font-semibold text-primary mb-4">
                What happens next?
              </h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Processing Period</p>
                    <p className="text-sm text-muted-foreground">
                      Our AI will analyze all participant profiles after the registration closes
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Smart Matching</p>
                    <p className="text-sm text-muted-foreground">
                      Advanced algorithms will find your most compatible connections based on skills, interests, and goals
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Results Delivery</p>
                    <p className="text-sm text-muted-foreground">
                      You'll receive your personalized matches via email after the event concludes
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-3">
                Why wait for results?
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our AI matching system analyzes all participants collectively to ensure the highest quality matches. 
                By processing everyone's data together, we can identify the most complementary skills, shared interests, 
                and compatible personalities for optimal networking and collaboration opportunities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" onClick={onBack}>
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Home
              </Button>
              <Button variant="professional" size="lg">
                <Share2 className="mr-2 h-5 w-5" />
                Share with Friends
              </Button>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                Questions? Contact the event organizers for assistance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}